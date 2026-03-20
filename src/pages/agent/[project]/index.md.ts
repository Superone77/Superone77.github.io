import type { APIRoute } from "astro";

import { getSiteContent } from "../../../lib/content";

export const prerender = true;

export function getStaticPaths() {
  return getSiteContent().agentProjects
    .filter((project) => project.agentIndex)
    .map((project) => ({
      params: { project: project.slug },
      props: { projectSlug: project.slug }
    }));
}

export const GET: APIRoute = ({ props }) => {
  const project = getSiteContent().agentProjects.find((candidate) => candidate.slug === props.projectSlug);

  if (!project?.agentIndex) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(project.agentIndex.rawMarkdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8"
    }
  });
};
