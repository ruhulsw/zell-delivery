import {InstagramIcon} from '../assets/icons/svg/socials/instagram-icon';
import {FacebookIcon} from '../assets/icons/svg/socials/facebook-icon';
import {TwitterIcon} from '../assets/icons/svg/socials/twitter-icon';
import {ThreadsIcon} from '../assets/icons/svg/socials/threads-icon';
import {YoutubeIcon} from '../assets/icons/svg/socials/youtube-icon';

export const SOCIALS = [
    {
        id: 1,
        name: 'Instagram',
        icon: <InstagramIcon style={{width: 44, height: 44}}/>,
        redirect: 'https://instagram.com/mesazhe_drite?igshid=MmVlMjlkMTBhMg%3D%3D&utm_source=qr'
    }, {
        id: 2,
        name: 'Facebook',
        icon: <FacebookIcon style={{width: 44, height: 44}}/>,
        redirect: 'https://www.facebook.com/www.zell.al?mibextid=hrBMPu'
    }, {
        id: 3,
        name: 'Twitter',
        icon: <TwitterIcon style={{width: 44, height: 44}}/>,
        redirect: 'https://twitter.com/MesazheDrite'
    }, {
        id: 4,
        name: 'Threads',
        icon: <ThreadsIcon style={{width: 34, height: 34}}/>,
        redirect: 'https://www.threads.net/@mesazhe_drite'
    }, {
        id: 5,
        name: 'Youtube',
        icon: <YoutubeIcon style={{width: 44, height: 44}}/>,
        redirect: 'https://youtube.com/@zell_al?si=Xl3x6obD_NyzaxQG'
    }
]