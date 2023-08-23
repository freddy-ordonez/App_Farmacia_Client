import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import InventoryIcon from '@mui/icons-material/Inventory';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <PeopleIcon />,
        label: 'Usuarios',
        route: 'usuarios',
    },
    {
        id: 1,
        icon: <InventoryIcon />,
        label: 'Productos',
        route: 'productos',
    },
    {
        id: 2,
        icon: <PermContactCalendarIcon />,
        label: 'Clientes',
        route: 'clientes',
    },
    {
         id: 3,
         icon: <ReceiptLongIcon />,
         label: 'Facturacion',
         route: 'facturacion',
    },
    // {
    //     id: 4,
    //     icon: <SettingsEthernetIcon />,
    //     label: 'Functions',
    //     route: 'functions',
    // },
    //  {
    //      id: 5,
    //      icon: <SettingsInputComponentIcon />,
    //      label: 'Machine learning',
    //      route: 'machine-learning',
    // },
]