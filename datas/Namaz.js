import {SunriseIcon} from "../assets/icons/svg/sunrise-icon";
import {MorningIcon} from "../assets/icons/svg/morning-icon";
import {MiddayIcon} from "../assets/icons/svg/midday-icon";
import {AfternoonIcon} from "../assets/icons/svg/afternoon-icon";
import {SunsetIcon} from "../assets/icons/svg/sunset-icon";
import {MoonBrightIcon} from "../assets/icons/svg/moon-bright-icon";
import {COLOR} from "../common/colors/color";

export const NAMAZ = [
    {'id': 1, 'name': 'Fajr', 'icon': <SunriseIcon width={35} height={35} fill={COLOR.secondary}/>, 'time': '04:13'},
    {'id': 2, 'name': 'Sunrise', 'icon': <MorningIcon width={35} height={35} fill={COLOR.secondary}/>, 'time': '06:13'},
    {'id': 3, 'name': 'Dhuhr', 'icon': <MiddayIcon width={35} height={35} fill={COLOR.secondary}/>, 'time': '13:00'},
    {'id': 4, 'name': 'Ashar', 'icon': <AfternoonIcon width={35} height={35} fill={COLOR.secondary}/>, 'time': '16:15'},
    {'id': 5, 'name': 'Maghrib', 'icon': <SunsetIcon width={35} height={35} fill={COLOR.secondary}/>, 'time': '19:42'},
    {'id': 6, 'name': 'Ishaa', 'icon': <MoonBrightIcon width={28} height={28} fill={COLOR.secondary}/>, 'time': '21:36'},
]