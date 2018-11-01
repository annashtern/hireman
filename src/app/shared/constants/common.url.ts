const api = 'http://hire-man.grassbusinesslabs.tk/public/api/';
// const api = 'https://hireman.smartcapper.online/server/public/api/';

export const COMMON_URL = {
  auth: {
    login: api + 'login',
    logout: api + 'logout'
  },
  user: {
    index: api + 'user',
    create: api + 'register',
    update: api + 'user/7',
      send: api + 'support',
      password: api + 'password/sms', //phone
      smsCode: api + 'password/change',//code
      reset: api + 'reset', //password
      subscribe: api + 'subscribe'

  },
  job: {
    index: api + 'jobs',
    apply: api + 'jobs',
    share: api + 'share',
    remove: api + 'deleteorder/',
    order: api + 'orderjobs'
  },
  my_job: {
    index: api + 'myjobs',
    remove: api + 'job/delete/',
    search: api + 'search',
    count: api + 'jobs/'

  },
  all_skill: {
    index: api + 'skill',
  },
  skill: {
    index: api + 'myskill',
    create: api + 'skill',
    update: api + 'updatelevel',
    remove: api + 'deleteskill'
  },
  friend: {
    index: api + 'friend',
    incoming: api + 'friend/incoming',
    acc: api + 'friend/',
    dec: api + 'friend/',
    remove: api + 'friend/delete',
    add: api + 'friend/send',
    favorite: api +'favorite',
      addfavorite: api + 'addfavorite/',
      deletefavorite: api +'favorite/delete/'

  },

};
