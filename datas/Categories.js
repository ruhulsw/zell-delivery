import BookIcon from '../assets/icons/svg/book-icon';
import { CollectionIcon } from '../assets/icons/svg/collection-icon';
import { LibraryIcon } from '../assets/icons/svg/library-icon';
import { MosqueIcon } from '../assets/icons/svg/mosque-icon';
import { MoonIcon } from '../assets/icons/svg/moon-icon';
import { FamilyIcon } from '../assets/icons/svg/family-icon';
import { CalculatorIcon } from '../assets/icons/svg/calculator-icon';
import { CalendarIcon } from '../assets/icons/svg/calendar-icon';

export const CATEGORIES = [
    {
        id: '67861f27a714891725421ed7',
        name: 'Risale-i Nur',
        icon: <BookIcon style={{ width: 22, height: 22 }} />,
        redirect: 'Risale',
    },
    {
        id: '67861f31a714891725421ed9',
        name: 'Koleksion',
        icon: <CollectionIcon style={{ width: 22, height: 22 }} />,
        // redirect: 'Collection',
        redirect: 'Risale',
    },
    {
        id: '67861f36a714891725421edb',
        name: 'Libraria',
        icon: <LibraryIcon style={{ width: 22, height: 22 }} />,
        // redirect: 'Library',
        redirect: 'Risale',
    },
    {
        id: '67861f3ca714891725421edd',
        name: 'Mysliman i Ri',
        icon: <MoonIcon style={{ width: 22, height: 22 }} />,
        redirect: 'Risale',
    },
    {
        id: '67861f41a714891725421edf',
        name: 'Lutje',
        icon: <MosqueIcon style={{ width: 22, height: 22 }} />,
        // redirect: 'PrayerScreen',
        redirect: 'Risale',
    },
    {
        id: '67861f45a714891725421ee1',
        name: 'Familja',
        icon: <FamilyIcon style={{ width: 30, height: 30 }} />,
        // redirect: 'Family',
        redirect: 'Risale',
    },
    {
        id: '67861f4aa714891725421ee3',
        name: 'Numeratori',
        icon: <CalculatorIcon style={{ width: 25, height: 25 }} />,
        redirect: 'Counter',
    },
    {
        id: '67861f50a714891725421ee5',
        name: 'Kalendari',
        icon: <CalendarIcon style={{ width: 25, height: 25 }} />,
        redirect: 'Calendar',
    },
];
