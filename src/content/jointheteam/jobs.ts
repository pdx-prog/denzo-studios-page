export interface Job {
  id: string;
  title: string;
  description: string;
  type: "Plaza" | "Pasantía";
  iconName: "PenTool" | "Briefcase" | "Video" | "Code" | "Layout" | "Megaphone";
}

export const jobs: Job[] = [
  {
    id: "gerente-creativo",
    title: "Gerente Creativo de Diseño",
    description: "Lidera proyectos creativos y supervisa la identidad visual de nuestras marcas.",
    type: "Plaza",
    iconName: "PenTool",
  },
  {
    id: "agente-ventas",
    title: "Agente de Ventas",
    description: "Gestiona relaciones con clientes y desarrolla nuevas oportunidades comerciales.",
    type: "Plaza",
    iconName: "Briefcase",
  },
  {
    id: "creador-contenido",
    title: "Creador de Contenido",
    description: "Produce contenido audiovisual y escrito para nuestras plataformas digitales.",
    type: "Plaza",
    iconName: "Video",
  },
  {
    id: "pasantia-desarrollo",
    title: "Pasantía en Desarrollo",
    description: "Apoya al equipo técnico en el desarrollo de aplicaciones web y digitales.",
    type: "Pasantía",
    iconName: "Code",
  },
  {
    id: "pasantia-diseno",
    title: "Pasantía en Diseño",
    description: "Colabora en proyectos de branding, UI/UX y producción gráfica.",
    type: "Pasantía",
    iconName: "Layout",
  },
  {
    id: "pasantia-marketing",
    title: "Pasantía en Marketing",
    description: "Participa en estrategias de contenido, redes sociales y campañas digitales.",
    type: "Pasantía",
    iconName: "Megaphone",
  },
];
