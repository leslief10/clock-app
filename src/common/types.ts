export interface QuoteData {
    readonly author: string;
    readonly authorSlug: string;
    readonly content: string;
    readonly dateAdded: string;
    readonly dateModified: string;
    readonly length: number;
    readonly tags: string[];
    readonly _id: string;
}

export interface TimeData {
    readonly date: string;
    readonly dateTime: string;
    readonly day: number;
    readonly dayOfWeek: string;
    readonly dstActive: boolean;
    readonly hour: number;
    readonly milliseconds: number;
    readonly minute: number;
    readonly month: number;
    readonly seconds: number;
    readonly time: string;
    readonly timeZone: string;
    readonly year: number;
}

export interface LocationData {
    readonly city: {
        readonly fips: string | null;
        readonly alpha2: string | null;
        readonly geonames_id: number | null;
        readonly hasc_id: string | null;
        readonly name: string;
        readonly name_translated: string;
        readonly wikidata_id: string | null;
    };
    readonly continent: {
        readonly code: string | null;
        readonly geonames_id: number | null;
        readonly name: string;
        readonly name_translated: string;
        readonly wikidata_id: string | null;
    };
    readonly country: {
        readonly alpha2: string | null;
        readonly alpha3: string | null;
        readonly calling_code: string[];
        readonly currencies: object[];
        readonly emoji: string | null;
        readonly fips: string | null;
        readonly geonames_id: number | null;
        readonly hasc_id: string | null;
        readonly ioc: string | null;
        readonly is_in_european_union: boolean;
        readonly languages: object[];
        readonly name: string;
        readonly name_translated: string;
        readonly timezones: string[];
        readonly wikidata_id: string | null;
    };
    readonly geonames_id: number;
    readonly latitude: number;
    readonly longitude: number;
    readonly region: object;
    readonly zip: string;
}
