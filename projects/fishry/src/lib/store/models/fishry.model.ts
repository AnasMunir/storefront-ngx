export interface AppStateModel {
	isLoaded: boolean
	generalSettings: IGeneralSettings
	themeSettings: any
	storeSettings: any
	navigation: any
	storeID: string
	domain: string
	isPlatformBrowser: boolean
}

export interface IGeneralSettings {
	activeDomainInfo: string
	address1: string
	analyticsSnippet: string
	cachedversion: number
	city: string
	contactEmail: string
	country: string
	email: string
	existingDomain: string
	fb_chat_enabled: boolean
	fb_page_id: string
	fb_tracking_code: string
	ga_conversion_id: string
	ga_conversion_label: string
	ga_ecommerec_id: string
	ga_profile_id: string
	ga_remarketing_label: string
	homePageTitle: string
	hostName: string
	legalname: string
	name: string
	nav_data: any
	ogImage: string
	phone: string
	settings: string
	sms_verification: boolean
	storeID: any
	taxIncluded: boolean
	taxOnShipping: boolean
	thanks_page_tracking_code: string
	themeFolderName: string
	theme_settings: string
	themeid: string
	windows_store_id: string
	zip: string
}