# This script is used to initialise the dev env for this package.
# Depending on the node version being used, it will do slightly different actions 

version=`node --version`

while IFS='.' read -ra ADDR; do
    counter=0
    for i in "${ADDR[@]}"; do
        if [ $counter == 0 ]
        then
            version=$i
        fi
        counter=$(($counter+1))
    done
done <<< "$version"
version="${version:1}" # here version will be something like v16. So we remove the v

if [ "$version" -gt "15" ]; then
    npm i -d --force
else
    node --version && npm i -d
fi