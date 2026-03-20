import type { APIRoute } from "astro";

import { getSiteContent } from "../../../lib/content";

export const prerender = true;

export function getStaticPaths() {
  return getSiteContent().agentProjects.flatMap((project) =>
    project.agentDocs.map((doc) => ({
      params: { doc: doc.slug, project: project.slug },
      props: { docSlug: doc.slug, projectSlug: project.slug }
    }))
  );
}

export const GET: APIRoute = ({ props }) => {
  const project = getSiteContent().agentProjects.find((candidate) => candidate.slug === props.projectSlug);
  const doc = project?.agentDocs.find((candidate) => candidate.slug === props.docSlug);

  if (!doc) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(doc.rawMarkdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8"
    }
  });
};
