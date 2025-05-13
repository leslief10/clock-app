interface MongoId {
    readonly $oid: string;
}

export interface Quote {
    readonly _id: MongoId;
    readonly text: string;
    readonly author: string;
    readonly source?: string;
}
export interface Location {
    readonly continent_code: string | null;
    readonly continent_name: string | null;
    readonly country_code2: string | null;
    readonly country_code3: string | null;
    readonly country_name: string | null;
    readonly country_name_official: string | null;
    readonly is_eu: boolean;
    readonly state_prov: string | null;
    readonly state_code: string | null;
    readonly district: string | null;
    readonly city: string | null;
    readonly zipcode: string | null;
    readonly latitude: string | null;
    readonly longitude: string | null;
}

export interface TimeZone {
    readonly name: string;
    readonly offset: number;
    readonly offset_with_dst: number;
    readonly date: string;
    readonly date_time: string;
    readonly date_time_txt: string;
    readonly date_time_wti: string;
    readonly date_time_ymd: string;
    readonly date_time_unix: number;
    readonly time_24: string;
    readonly time_12: string;
    readonly week: number;
    readonly month: number;
    readonly year: number;
    readonly year_abbr: string;
    readonly is_dst: boolean;
    readonly dst_savings: number;
    readonly dst_exists: boolean;
    readonly dst_start: Record<string, unknown>;
    readonly dst_end: Record<string, unknown>;
}

export interface Data {
    readonly ip: string;
    readonly location: Location;
    readonly time_zone: TimeZone;
}

export type TimeData = TimeZone;
export type LocationData = Location;

export interface GreetingConfig {
    greeting: string;
    icon: string;
}
