import { Fragment, type ReactNode } from "react";

/**
 * Renderiza texto con énfasis en **negrita** estilo markdown ligero.
 * Permite mantener las negritas del briefing sin meter HTML en los JSON de i18n.
 */
export const renderRich = (text: string): ReactNode =>
  text.split("**").map((chunk, index) =>
    index % 2 === 1 ? <strong key={index}>{chunk}</strong> : <Fragment key={index}>{chunk}</Fragment>,
  );
