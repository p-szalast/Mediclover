import { CanActivateFn } from '@angular/router';
import { USER_ROLE } from '../shared/config';

export const isAdminGuard: CanActivateFn = (route, state) => {
  if (USER_ROLE === 'admin') {
    return true;
  } else {
    alert('You do not have permission to enter this site');
    return false;
  }
};
