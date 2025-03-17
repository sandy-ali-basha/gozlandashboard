import React, { useState } from "react";
import { Drawer } from "../styled/Drawer";
import { Box, Collapse } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBarHeader from "./SideBarHeader";
import SideBarLink from "./SideBarLink";
// import SellRoundedIcon from "@mui/icons-material/SellRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  AdminPanelSettingsRounded,
  BookmarkRounded,
  CategoryRounded,
  // CountertopsRounded,
  DiscountRounded,
  GavelRounded,
  HomeRounded,
  // Money,
  // Public,
  ShoppingCartCheckout,
  SpaceDashboardRounded,
  // WorkRounded,
} from "@mui/icons-material";
const SideBar = ({ open, setOpen }) => {
  const { t } = useTranslation("sidebar");
  const [hovered, setHovered] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleToggleSection = (sectionName) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };
  const role = localStorage.getItem("role");

  const links = [
    {
      name: t("Admin"),
      link: "/dashboard/admin",
      icon: <AdminPanelSettingsRounded />,
    },
    {
      name: t("Products"),
      icon: <CategoryRounded />,
      subOptions: [
        { name: t("Products"), link: "/dashboard/product" },
        { name: t("Categories"), link: "/dashboard/products/categories" }
      ],
    },
    {
      name: t("orders"),
      link: "/dashboard/orders",
      icon: <ShoppingCartCheckout />,
    },
   
    {
      name: t("discounts"),
      link: "/dashboard/discounts",
      icon: <DiscountRounded />,
    },
    // {
    //   name: t("point price"),
    //   link: "/dashboard/settings",
    //   icon: <Money />,
    // },
    {
      name: t("terms"),
      link: "/dashboard/terms",
      icon: <GavelRounded />,
    },
    
    {
      name: t("Home"),
      link: "/dashboard/home",
      icon: <HomeRounded color={"secondary.main"} />,
    },
    {
      name: t("customers"),
      link: "/dashboard/customers",
      icon: <HomeRounded color={"secondary.main"} />,
    },

  ];
  const website_admin = [
    {
      name: t("terms"),
      link: "/dashboard/terms",
      icon: <GavelRounded />,
    },
    {
      name: t("Home"),
      link: "/dashboard/home",
      icon: <HomeRounded color={"secondary.main"} />,
    },
  ];
  const orders_admin = [
    {
      name: t("orders"),
      link: "/dashboard/orders",
      icon: <ShoppingCartCheckout />,
    },
  ];
  const ecommerce_admin = [
    {
      name: t("Products"),
      icon: <CategoryRounded />,
      subOptions: [
        { name: t("Products"), link: "/dashboard/product" },
        { name: t("Categories"), link: "/dashboard/products/categories" }
      ],
    },
    {
      name: t("orders"),
      link: "/dashboard/orders",
      icon: <ShoppingCartCheckout />,
    },

    // {
    //   name: t("point price"),
    //   link: "/dashboard/settings",
    //   icon: <Money />,
    // },
    {
      name: t("discounts"),
      link: "/dashboard/discounts",
      icon: <DiscountRounded />,
    },
    
  ];

  const returnLinks = () => {
    if (role === "super_admin") return links;
    if (role === "website_admin") return website_admin;
    if (role === "ecommerce_admin") return ecommerce_admin;
    if (role === "order_admin") return orders_admin;
    else return [];
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      hovered={hovered ? "true" : ""}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        "& .MuiDrawer-paper": {
          boxShadow: "0px 4px 18px 0px rgba(47, 43, 61, 0.1)",
          borderRight: "none",
        },
      }}
    >
      <SideBarHeader
        open={open}
        setOpen={setOpen}
        hovered={hovered ? "true" : ""}
      />
      <Box
        sx={{
          padding: "0 16px",
          pt: "20px",
          display: "flex",
          flexDirection: "column",
          rowGap: "4px",
          marginTop: "20px",
        }}
      >
        {returnLinks().map((link, index) => (
          <React.Fragment key={index}>
            {link.subOptions ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleToggleSection(link.name)}
                >
                  <SideBarLink
                    text={t(link.name)}
                    icon={link.icon}
                    open={open || hovered}
                  />
                  {openSections[link.name] ? (
                    <ExpandLessIcon sx={{ color: "text.main" }} />
                  ) : (
                    <ExpandMoreIcon sx={{ color: "text.main" }} />
                  )}
                </Box>
                <Collapse
                  in={openSections[link.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  {link.subOptions.map((subOption, subIndex) => (
                    <NavLink to={subOption.link} key={subIndex}>
                      {({ isActive }) => (
                        <SideBarLink
                          style={{ paddingTop: "5px" }}
                          text={t(subOption.name)}
                          active={isActive}
                          icon={null}
                          open={open || hovered}
                        />
                      )}
                    </NavLink>
                  ))}
                </Collapse>
              </>
            ) : (
              <NavLink to={link.link} key={index}>
                {({ isActive }) => (
                  <SideBarLink
                    text={t(link.name)}
                    active={isActive}
                    icon={link.icon}
                    open={open || hovered}
                  />
                )}
              </NavLink>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Drawer>
  );
};

export default SideBar;
