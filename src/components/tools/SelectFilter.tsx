interface FilterSelectProps {
    options: string[];
    value: string | null;
    onChange: (value: string | null) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ options, value, onChange }) => {
    return (
        <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value || null)}
            className=' mx-2 py-2 px-4 border rounded-lg border-[#23b3a3] outline-none my-2 2xl:my-0 '
        >
        <option value="">Todos</option>
        {options.map(option => (
            <option
                key={option}
                value={option}
                className='text-lg font-medium'
            >
                {option}
            </option>
        ))}
        </select>
    );
}

export default FilterSelect;