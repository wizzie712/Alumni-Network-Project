
declare class StickyNavigation {

  currentId: string | null;
  currentTab: JQuery<HTMLElement> | null;
  tabContainerHeight: number;
  constructor();
  onTabClick(event: Event, element: JQuery<HTMLElement>): void;
  onScroll(): void;
  onResize(): void;
  checkTabContainerPosition(): void;
  findCurrentTabSelector(element: JQuery<HTMLElement>): void;
  setSliderCss(): void;
}

export default StickyNavigation;
