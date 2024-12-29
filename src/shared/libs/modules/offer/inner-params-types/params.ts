import { ParamsDictionary } from 'express-serve-static-core';

export type ParamOfferId = {
  offerId: string;
} | ParamsDictionary;

export type ParamCityName = {
  cityName: string;
} | ParamsDictionary;

export type ParamUserId = {
  userId: string;
} | ParamsDictionary;

export type ParamUserAndOfferId = {
  offerId: string;
  userId: string;
} | ParamsDictionary;
