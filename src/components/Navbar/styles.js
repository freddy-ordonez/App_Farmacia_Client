export const navbarStyles = {
    drawer: {
        width: 10,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            backgroundColor: '#101F33',
            color: 'rgba(255, 255, 255, 0.7)',
        },
        '& .Mui-selected': {
            color: 'red',
        },
    },
    icons: {
        color: 'rgba(255, 255, 255, 0.7)!important',
        margin: "auto",
        minWidth: 0
    },
    text: {
        '& span': {
            marginLeft: '-10px',
            fontWeight: '600',
            fontSize: '16px',
        }
    }
};