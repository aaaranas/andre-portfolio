/**
 * Everything, in one import.
 *
 * Use this from the server and from the shell app, which genuinely needs all
 * of it. Client components that render one domain should import that domain's
 * module directly — `@/lib/data/projects`, `@/lib/data/analytics`, … — so a
 * window only ships the data it shows. The notebooks alone are a third of the
 * total, and nobody opening /experience should download them.
 */
export * from "./personal";
export * from "./projects";
export * from "./skills";
export * from "./experience";
export * from "./education";
export * from "./analytics";
export * from "./automation";
export * from "./certifications";
