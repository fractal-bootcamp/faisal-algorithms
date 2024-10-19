interface SortingBarProps {
    value: number;
    style?: React.CSSProperties;
    isSorted?: boolean;
    isCompared?: boolean;
    isSwapped?: boolean;
    isCurrentIndex?: boolean;
    isMinIndex?: boolean;
    isPivot?: boolean;
    className?: string;
}

const SortingBar: React.FC<SortingBarProps> = ({
    value,
    style = {},
    isSorted = false,
    isCompared = false,
    isSwapped = false,
    isCurrentIndex = false,
    isMinIndex = false,
    isPivot = false,
    className = ""
}) => {
    const getBackgroundColor = () => {
        if (isSorted) {
            return "bg-green-300";
        }
        if (isSwapped) {
            return "bg-yellow-300";
        }
        if (isCompared || isMinIndex) {
            return "bg-blue-300";
        }
        if (isCurrentIndex) {
            return "bg-yellow-300";
        }
        if (isPivot) {
            return "bg-yellow-300";
        }
        return "bg-white";
    };

    return (
        <div
            className={`
        w-16 
        border 
        transition-colors 
        duration-200 
        ${getBackgroundColor()} 
        ${className}
      `}
            style={{
                height: `${value * 20}px`,
                ...style
            }}
        >
            <div className="text-center text-sm text-gray-700 font-semibold">
                {value}
            </div>
        </div>
    );
};

export default SortingBar;