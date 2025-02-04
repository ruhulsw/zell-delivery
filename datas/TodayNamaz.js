import {SunriseIcon} from "../assets/icons/svg/sunrise-icon";
import {MorningIcon} from "../assets/icons/svg/morning-icon";
import {MiddayIcon} from "../assets/icons/svg/midday-icon";
import {AfternoonIcon} from "../assets/icons/svg/afternoon-icon";
import {SunsetIcon} from "../assets/icons/svg/sunset-icon";
import {MoonBrightIcon} from "../assets/icons/svg/moon-bright-icon";
import {COLOR} from "../common/colors/color";

export const TODAY_NAMAZ = [
    {'id': 1, 'name': 'Fajr', 'icon': <SunriseIcon width={20} height={20} fill={COLOR.light}  />, 'time': '04:13'},
    {'id': 2, 'name': 'Sunrise', 'icon': <MorningIcon width={20} height={20} fill={COLOR.light} />, 'time': '06:13'},
    {'id': 3, 'name': 'Dhuhr', 'icon': <MiddayIcon width={20} height={20} fill={COLOR.light} />, 'time': '13:00'},
    {'id': 4, 'name': 'Ashar', 'icon': <AfternoonIcon width={20} height={20} fill={COLOR.light} />, 'time': '16:15'},
    {'id': 5, 'name': 'Maghrib', 'icon': <SunsetIcon width={20} height={20} fill={COLOR.light} />, 'time': '19:42'},
    {'id': 6, 'name': 'Ishaa', 'icon': <MoonBrightIcon width={18} height={18} fill={COLOR.light} />, 'time': '21:36'},
]