export const colors = [
    '#F28B82', // Red
    '#FBBC04', // Orange
    '#FFF475', // Yellow
    '#CCFF90', // Green
    '#A7FFEB', // Teal
    '#CBF0F8', // Light Blue
    '#AECBFA', // Blue
    '#D7AEFB', // Purple
    '#FDCFE8', // Pink
    '#E6C9A8', // Brown
    '#E8EAED', // Gray
]

export const ColorPicker = ({ onSelectColor, onClose }) => (
    <div className='color-picker-modal'>
        <div className='color-picker-close' onClick={onClose} title='Close color picker'>
            ×
        </div>
        <div className='color-picker'>
            {colors.map((color, idx) => (
                <div
                    key={idx}
                    className='color-swatch'
                    style={{ backgroundColor: color }}
                    onClick={() => onSelectColor(color)}
                ></div>
            ))}
        </div>
    </div>
)
