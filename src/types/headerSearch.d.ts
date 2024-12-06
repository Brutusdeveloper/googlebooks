export interface HeaderSearchProps {
        searchTerm: string;
        handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        category: string;
        handleCategoryChange: (e: SelectChangeEvent<string>) => void;
        categories: Category[];
}