import { Menu } from "./menuTypes";

import { BASE_URL } from "../services.constants";

const fetchMenu = async (menuId: string): Promise<Menu> => {
  const response = await fetch(`${BASE_URL}/${menuId}`);

  if (!response.ok) {
    throw new Error(
      `Error while fetching menu data: HTTP ${response.status} - ${response.statusText}`
    );
  }

  const menu: Menu = await response.json();
  return menu;
};

export default fetchMenu;
