import styled from 'styled-components';
import {
  getHeader,
  getSubheader,
  getDrawerSidebar,
  getSidebarTrigger,
  getSidebarContent,
  getCollapseBtn,
  getContent,
} from '@mui-treasury/layout';

export const Header = getHeader(styled);
export const Subheader = getSubheader(styled);
export const DrawerSidebar = getDrawerSidebar(styled);
export const SidebarTrigger = getSidebarTrigger(styled);
export const SidebarContent = getSidebarContent(styled);
export const CollapseBtn = getCollapseBtn(styled);
export const Content = getContent(styled);
