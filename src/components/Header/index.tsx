"use client";
import Link from "next/link";
import style from "./styles.module.scss";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import { UserAuth } from "@/context/AuthContext";
import "./style.css";
import { IconMenu } from "./Icons/IconMenu";
import { IconInicio } from "./Icons/IconInicio";
import { IconHelp } from "./Icons/IconHelp";
import { IconSolicitud } from "./Icons/IconSolicitud";
import { IconRegister } from "./Icons/IconRegister";
import { IconAdmin } from "./Icons/IconAdmin";
import { IconClose } from "./Icons/IconClose";
import { IconLogin } from "./Icons/IconLogin";

const Header = () => {
  const { googleSignIn, user, logOut } = UserAuth();

  return (
    <header className={style.header}>
      <Link href="/">
        <img
          className={style.logo}
          src="https://www.mantenimientoseu.com/images/logo-mantenimientoseu-horizontal.png"
          alt="Logo"
        />
      </Link>
      <Dropdown className={style.header_drop}>
        <DropdownTrigger>
          <Button className={style.header_menu_btn}>
            {user?.completed ? (
              <>
                <Avatar size="sm" src={user?.photoUrl} />
                Hola, <strong>{user.name.split(" ")[0]}</strong>
              </>
            ) : (
              <>Menu</>
            )}
          <IconMenu />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disabledKeys={[
            user === null ? "signUp" : "",
            user?.rol !== "admin" ? "admin" : "",
          ]}
          aria-label="Static Actions"
        >
          <DropdownItem key="home">
            <Link className={style.header_links} href="/">
            <IconInicio />
              Inicio
            </Link>
          </DropdownItem>
          <DropdownItem key="ayuda">
            <Link className={style.header_links} href="/ayuda">
              <IconHelp />
              Centro de ayuda
            </Link>
          </DropdownItem>
          {user?.completed ? (
            <DropdownItem key="account">
              <Link className={style.header_links} href="/account">
                <IconSolicitud />
                Mis Solicitudes
              </Link>
            </DropdownItem>
          ) : (
            <DropdownItem key="signUp">
              <Link className={style.header_links} href="/signup">
                <IconRegister />
                Completar Registro
              </Link>
            </DropdownItem>
          )}

          <DropdownItem className={style.header_admin} key="admin">
            <Link className={style.header_links} href="/admin">
              <IconAdmin />
              Admin
            </Link>
          </DropdownItem>
          {user?.id ? (
            <DropdownItem
              key="logOut"
              className={style.header_logout}
              onPress={logOut}
            >
              <IconClose />
              Cerrar Sesion
            </DropdownItem>
          ) : (
            <DropdownItem
              key="login"
              onPress={googleSignIn}
              className={style.header_links}
            >
              <IconLogin />
              Iniciar Sesion
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </header>
  );
};

export default Header;
