import {
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  CardActions,
  IconButton,
} from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import React, { useCallback, useState } from "react";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useHome } from "hooks/home/useHome";
import HomeUpdate from "./HomeUpdate";
import { Add, Edit } from "@mui/icons-material";
import { useNav } from "hooks/home/useNav";
import NavUpdate from "./NavUpdate";
import HomeCreate from "./HomeCreate";

const HomeIndex = () => {
  const { data, isLoading } = useHome();
  const { data: navData, isLoading: navIsLoading } = useNav();
  const [navUpdate, setNavUpdate] = useState();
  const [createdID, setcreatedID] = useState();
  const [create, setCreate] = useState(false);
  const [type, setType] = useState();

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const handleEdit = useCallback(
    (id, type) => {
      setEditedID(id);
      setType(type);
    },
    [setEditedID, setType]
  );

  const handleCreate = useCallback(
    (id, type) => {
      setCreate(true);
      setcreatedID(id);
      setType(type);
    },
    [setcreatedID]
  );

  const handleEditNav = useCallback(
    (id) => {
      setNavUpdate(id);
    },
    [setNavUpdate]
  );

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <HomeUpdate id={editedID} type={type} />}
      {
        <HomeCreate
          type={type}
          open={create}
          setOpen={setCreate}
          id={createdID}
        />
      }
      {navUpdate && <NavUpdate id={navUpdate} setId={setNavUpdate} />}

      <Box
        sx={{
          width: { sl: "300px" },
          backgroundColor: { xs: "background.main" },
          ml: { xs: "0px" },
        }}
      >
        <Typography sx={{ my: 2 }} variant="body1" >
          Navbar
        </Typography>
        <BoxStyled
          sx={{ px: "10px", display: "flex", justifyContent: "space-evenly" }}
        >
          {navData?.data?.navbar?.map((item, idx) => (
            <Card key={idx}>
              <CardContent sx={{ display: "flex", gap: 3 }}>
                <Typography variant="body1">{item.text}</Typography>
                <Typography variant="body1">{item.link}</Typography>
                <Edit onClick={() => handleEditNav(item?.id)} />
              </CardContent>
            </Card>
          ))}
        </BoxStyled>
        <Typography sx={{ my: 2 }} variant="body1" >
          Slider
        </Typography>
        <BoxStyled sx={{ px: "10px" }}>
          {data?.data?.home_sections
            ?.filter((section) => section.type === "slider") // Filter sections of type "banner"
            .map((section, idx) => (
              <Box key={section.id}>
                <IconButton onClick={() => handleCreate(section?.id, "slider")}>
                  <Add />
                </IconButton>
                {section.items.map((item) => (
                  <Card key={item.id} sx={{ mt: 2 }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={item.image}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                      <Button
                        href={item.cta_link}
                        target="_blank"
                        variant="contained"
                        sx={{ mt: 1 }}
                      >
                        {item.cta_link}
                      </Button>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => handleEdit(item?.id, "slider")}
                      >
                        <Edit />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            ))}
        </BoxStyled>
        <Typography sx={{ my: 2 }} variant="body1" >
          collections
        </Typography>
        <BoxStyled sx={{ px: "10px" }}>
          {data?.data?.home_sections
            ?.filter((section) => section.type === "collections") // Filter sections of type "banner"
            .map((section, idx) => (
              <Grid container key={section.id}>
                {section.items.map((item) => (
                  <Grid item md="4" key={item.id} sx={{ mt: 2, p: 1 }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={item.image}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography variant="h6" >
                        {item.title}
                      </Typography>
                      <Button
                        href={item.cta_link}
                        target="_blank"
                        variant="outlined"
                        sx={{ mt: 1 }}
                      >
                        {item.cta_link}
                      </Button>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => handleEdit(item?.id, "collections")}
                      >
                        <Edit />
                      </IconButton>
                    </CardActions>
                  </Grid>
                ))}
              </Grid>
            ))}
        </BoxStyled>
        <Typography sx={{ my: 2 }} variant="body1" >
          categories
        </Typography>
        <BoxStyled sx={{ px: "10px" }}>
          {data?.data?.home_sections
            ?.filter((section) => section.type === "categories") // Filter sections of type "banner"
            .map((section, idx) => (
              <Grid container key={section.id}>
                {section.items.map((item) => (
                  <Grid item md="2" key={item.id} sx={{ p: 1 }}>
                    <a
                      href={item.cta_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={item.title}
                      />
                      <CardContent>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography variant="body1">
                          {item.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton
                          onClick={() => handleEdit(item?.id, "categories")}
                        >
                          <Edit />
                        </IconButton>
                      </CardActions>
                    </a>
                  </Grid>
                ))}
              </Grid>
            ))}
        </BoxStyled>
        <Typography sx={{ my: 2 }} variant="body1" >
          Two Items
        </Typography>
        <BoxStyled sx={{ px: "10px" }}>
          {data?.data?.home_sections
            ?.filter((section) => section.type === "TwoItems") // Filter sections of type ""
            .map((section, idx) => (
              <Grid container key={section.id}>
                {section.items.map((item) => (
                  <Grid item md="6" key={item.id} sx={{ p: 1 }}>
                    <a
                      href={item.cta_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CardMedia
                        component="img"
                        height="300"
                        image={item.image}
                        alt={item.title}
                      />
                      <CardContent>
                        <Typography variant="h6">{item.title}</Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton
                          onClick={() => handleEdit(item?.id, "TwoItems")}
                        >
                          <Edit />
                        </IconButton>
                      </CardActions>
                    </a>
                  </Grid>
                ))}
              </Grid>
            ))}
        </BoxStyled>
        <Typography sx={{ my: 2 }} variant="body1" >
          Banner
        </Typography>
        <BoxStyled sx={{ px: "10px" }}>
          {data?.data?.home_sections
            ?.filter((section) => section.type === "banner") // Filter sections of type ""
            .map((section, idx) => (
              <Grid container key={section.id}>
                {section.items.map((item) => (
                  <Grid item md="6" key={item.id} sx={{ p: 1 }}>
                    <CardMedia
                      component="img"
                      height="130"
                      image={item.image}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography variant="h6" >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" >
                        {item.description}
                      </Typography>
                      <Button
                        href={item.cta_link}
                        target="_blank"
                        variant="outlined"
                        sx={{ mt: 1 }}
                      >
                        {item.cta_link}
                      </Button>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => handleEdit(item?.id, "banner")}
                      >
                        <Edit />
                      </IconButton>
                    </CardActions>
                  </Grid>
                ))}
              </Grid>
            ))}
        </BoxStyled>
      </Box>
    </>
  );
};

export default HomeIndex;
