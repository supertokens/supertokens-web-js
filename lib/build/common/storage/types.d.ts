export declare type StorageHandler = {
    key: (index: number) => Promise<string | null>;
    getItem(key: string): Promise<string | null>;
    clear(): Promise<void>;
    removeItem(key: string): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
};
