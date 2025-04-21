export enum FilterType {
    PRICE_LOW_TO_HIGH = "Price: Low to High",
    PRICE_HIGH_TO_LOW = "Price: High to Low",
    NAME_ASC = "A to Z",
    NAME_DSC = "Z to A"
}

export enum ElementState{
    EXIST = "element exists",
    DISPLAYED = 'element is displayed',
    NOT_EXIST = 'element does not exist',
    URL = 'Url',
    TEXT = 'text',
    NOT_Displayed = 'not displayed',
    STRICT_EQUAL = 'strict equal'
}

export enum PageAction{
    OPEN_PAGE = "openthe Product Details page",
    BACK_TO_PAGE = 'return to the previous page',
    HUMBURGER_MENU_ALLITEMS = 'humburger menu, all items option',
    HUMBURGER_MENU_ABOUT= 'humburger menu, about option',
    HUMBURGER_MENU_RESET = 'humburger menu, reset state',
    HUMBURGER_MENU_LOGOUT = 'humburger menu, log out',
    Humburger_Menu_CLOSE = 'humburger menu, the close button'
   
}


