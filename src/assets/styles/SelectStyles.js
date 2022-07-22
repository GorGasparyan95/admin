export const colourStyles = {
    control: (styles, state) => ({
        ...styles,
        cursor: 'pointer',
        background: '#F8F8FA',
        borderRadius: '5px',
        width: '198px',
        border: state.isFocused? 'none': 'none',
        boxShadow: state.isFocused ? "none" : "none",
    }),
    indicatorSeparator: () => ({display:'none'}),
    dropdownIndicator: base => ({
        ...base,
        color: '#3E64FF',
        '&:hover': {
            color: '#3E64FF'
        }
      }),
    option: (styles, { isFocused, isSelected }) => {
        return {
            ...styles,
            cursor: 'pointer',

        };
    },
};
export const colourStylesStatus = {
    control: (styles, state) => ({
        ...styles,
        cursor: 'pointer',
        background: '#F8F8FA',
        borderRadius: '5px',
        width: '121px',
        border: state.isFocused? 'none': 'none',
        boxShadow: state.isFocused ? "none" : "none",
    }),
    indicatorSeparator: () => ({display:'none'}),
    dropdownIndicator: base => ({
        ...base,
        color: '#3E64FF',
        '&:hover': {
            color: '#3E64FF'
        }
      }),
    option: (styles, { isFocused, isSelected }) => {
        return {
            ...styles,
            cursor: 'pointer',

        };
    },
};