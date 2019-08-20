import moment from 'moment';

import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const time = moment().endOf('day').fromNow();          // 3 小时内
console.log(time);
