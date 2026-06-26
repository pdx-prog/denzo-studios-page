export type CVExperience = {
  empresa: string;
  cargo: string;
  fecha_inicio: string;
  fecha_fin: string;
  funciones: string;
};

export type CVProfessionalData = {
  nivel_academico: string;
  instituciones: string[];
  cursos_certificaciones: string[];
  area_interes: string;
  tiene_experiencia: boolean;
  experiencias: CVExperience[];
  conocimientos_tecnicos: string[];
  herramientas: string[];
  idiomas: string[];
  habilidades_blandas: string[];
};

export type CVSuggestPayload = {
  action: "suggest";
  nivel_academico: string;
  instituciones: string[];
  cursos_certificaciones: string[];
  experiencias: CVExperience[];
};

export type CVSuggestResponse = {
  conocimientos_tecnicos: string[];
  herramientas: string[];
  idiomas: string[];
  habilidades_blandas: string[];
};

export type CVGeneratePayload = {
  action: "generate";
  nombre_completo: string;
  correo_electronico: string;
  numero_contacto: string;
  municipio: string;
  departamento: string;
  nivel_academico: string;
  instituciones: string[];
  cursos_certificaciones: string[];
  area_interes: string;
  experiencias: CVExperience[];
  conocimientos_tecnicos: string[];
  herramientas: string[];
  idiomas: string[];
  habilidades_blandas: string[];
};
