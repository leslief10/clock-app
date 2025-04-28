export interface Quote {
    readonly _id: {
        readonly $oid: string;
    };
    readonly text: string;
    readonly author: string;
    readonly source?: string;
}

export interface Data {
    readonly ip: string;
    readonly location: {
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
    };
    readonly time_zone: {
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
        readonly dst_start: object;
        readonly dst_end: object;
    };
}

export type TimeData = Data['time_zone'];

export type LocationData = Data['location'];

export interface GreetingConfig {
    greeting: string;
    icon: string;
}
