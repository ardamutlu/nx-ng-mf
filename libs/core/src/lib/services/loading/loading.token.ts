import { HttpContextToken } from '@angular/common/http';

export const LOADING_KEY = new HttpContextToken<string | null>(() => null);
