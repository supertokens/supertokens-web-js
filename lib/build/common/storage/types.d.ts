export declare type StorageHandler = {
    key: (index: number) => Promise<string | null>;
    getItem: (key: string) => Promise<string | null>;
    clear: () => Promise<void>;
    removeItem: (key: string) => Promise<void>;
    setItem: (key: string, value: string) => Promise<void>;
    /**
     * Sync versions of the storage functions
     */
    keySync: (index: number) => string | null;
    getItemSync: (key: string) => string | null;
    clearSync: () => void;
    removeItemSync: (key: string) => void;
    setItemSync: (key: string, value: string) => void;
};
