echo "Starting tests for FDI $1";

if [ -z "$SUPERTOKENS_API_KEY" ]; then
    echo "SUPERTOKENS_API_KEY not set"
    exit 1
fi

frontendDriverVersion=$1
frontendDriverVersion=`echo $frontendDriverVersion | tr -d '"'`

webInterfaceJson=`cat ../webJsInterfaceSupported.json`
webJSInterfaceVersion=`echo $webInterfaceJson | jq ".version"`
webJSInterfaceVersion=`echo $webJSInterfaceVersion | tr -d '"'`
webJsFDIJson=`cat ../frontendDriverInterfaceSupported.json`
webJsFDIArray=`echo $webJsFDIJson | jq .versions`

echo "FDI versions supported by web js: $webJsFDIArray"

if [ -z "$SUPERTOKENS_API_KEY" ]; then
    echo "SUPERTOKENS_API_KEY missing"
    exit 1;
fi

echo "Running for web js interface version $webJSInterfaceVersion"
echo "Running 2 for web js interface version $webJSInterfaceVersion"

reactVersionXY=`curl -s -X GET \
"https://api.supertokens.io/0/web-js-interface/dependency/frontend/latest?password=$SUPERTOKENS_API_KEY&mode=DEV&version=$webJSInterfaceVersion&frontendName=auth-react" \
-H 'api-version: 0'`
if [[ `echo $reactVersionXY | jq .frontend` == "null" ]]
then
    echo "fetching latest X.Y version for react given web-js-interface X.Y version: $webJSInterfaceVersion gave response: $reactVersionXY. Please make sure all relevant drivers have been pushed."
    exit 1
fi
reactVersionXY=$(echo $reactVersionXY | jq .driver | tr -d '"')

reactInfo=`curl -s -X GET \
"https://api.supertokens.io/0/frontend/latest?password=$SUPERTOKENS_API_KEY&version=$reactVersionXY&name=auth-react" \
-H 'api-version: 0'`

if [[ `echo $reactInfo | jq .tag` == "null" ]]
then
    echo "fetching latest X.Y.Z version for react, X.Y version: $reactVersionXY gave response: $reactInfo"
    exit 1
fi

reactTag=$(echo $reactInfo | jq .tag | tr -d '"')
reactVersion=$(echo $reactInfo | jq .version | tr -d '"')

echo "React TAG: $reactTag, Exiting early for testing"
exit 1

cd ../../
git clone git@github.com:supertokens/supertokens-auth-react.git
cd supertokens-auth-react
echo "Checking out $reactTag in auth react"
git checkout $reactTag

reactFDIJson=`cat frontendDriverInterfaceSupported.json`
reactFDIArray=`echo $reactFDIJson | jq .versions`

echo "FDI versions supported by auth react: $reactFDIArray"

if [[ "$webJsFDIArray" != "$reactFDIArray" ]]; then
    echo "FDI supported for supertokens-auth-react and supertokens-web-js do not match. Exiting..."
    exit 1
fi

echo "Running init in supertokens-auth-react"
npm run init

echo "Packing and installing web js + dependencies"
cd ../project
npm pack
cd ../supertokens-auth-react
tar -xf ../project/supertokens-web-js-*.tgz --strip-components=1 -C node_modules/supertokens-web-js
rm -rf node_modules/supertokens-website
ln -s "$PWD/../project/node_modules/supertokens-website" node_modules

driverVersionXY=`curl -s -X GET \
"https://api.supertokens.io/0/frontend-driver-interface/dependency/driver/latest?password=$SUPERTOKENS_API_KEY&mode=DEV&version=$frontendDriverVersion&driverName=node" \
-H 'api-version: 0'`
if [[ `echo $driverVersionXY | jq .driver` == "null" ]]
then
    echo "fetching latest X.Y version for driver given frontend-driver-interface X.Y version: $frontendDriverVersion gave response: $driverVersionXY. Please make sure all relevant drivers have been pushed."
    exit 1
fi

driverVersionXY=$(echo $driverVersionXY | jq .driver | tr -d '"')
driverInfo=`curl -s -X GET \
"https://api.supertokens.io/0/driver/latest?password=$SUPERTOKENS_API_KEY&mode=DEV&version=$driverVersionXY&name=node" \
-H 'api-version: 0'`
if [[ `echo $driverInfo | jq .tag` == "null" ]]
then
    echo "fetching latest X.Y.Z version for driver, X.Y version: $driverVersionXY gave response: $driverInfo"
    exit 1
fi
driverTag=$(echo $driverInfo | jq .tag | tr -d '"')
driverVersion=$(echo $driverInfo | jq .version | tr -d '"')

git clone git@github.com:supertokens/supertokens-node.git
cd supertokens-node
git checkout $driverTag
coreDriverJson=`cat ./coreDriverInterfaceSupported.json`
coreDriverLength=`echo $coreDriverJson | jq ".versions | length"`
coreDriverArray=`echo $coreDriverJson | jq ".versions"`
coreDriverVersion=`echo $coreDriverArray | jq ". | last"`
coreDriverVersion=`echo $coreDriverVersion | tr -d '"'`
cd ../
rm -rf supertokens-node
cd ../project/.circleci

coreFree=`curl -s -X GET \
    "https://api.supertokens.io/0/core-driver-interface/dependency/core/latest?password=$SUPERTOKENS_API_KEY&planType=FREE&mode=DEV&version=$coreDriverVersion" \
-H 'api-version: 0'`
if [[ `echo $coreFree | jq .core` == "null" ]]
then
    echo "fetching latest X.Y version for core given core-driver-interface X.Y version: $coreDriverVersion, planType: FREE gave response: $coreFree. Please make sure all relevant cores have been pushed."
    exit 1
fi
coreFree=$(echo $coreFree | jq .core | tr -d '"')
someTestsRan=true
tries=1

while [ $tries -le 3 ]
do
    tries=$(( $tries + 1 ))
    ./setupAndTestWithFreeCore.sh $coreFree $driverTag
    if [[ $? -ne 0 ]]
    then
        if [[ $tries -le 3 ]]
        then
            rm -rf ../../supertokens-root
            rm -rf ../../supertokens-auth-react/test/server/node_modules/supertokens-node
            git checkout HEAD -- ../../supertokens-auth-react/test/server/package.json
            echo "failed test.. retrying!"
        else
            echo "test failed... exiting!"
            exit 1
        fi
    else
        rm -rf ../../supertokens-root
        rm -rf ../../supertokens-auth-react/test/server/node_modules/supertokens-node
        git checkout HEAD -- ../../supertokens-auth-react/test/server/package.json
        break
    fi
done