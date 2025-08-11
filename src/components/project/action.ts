"use client";

import { Octokit } from "octokit";

export async function getRepos() {

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const repos = await octokit.rest.repos.listForUser({
    username: "mehul-m-prajapati",
    per_page: 150,
    type: "owner",
    direction: "desc",
    sort: "pushed",
  });

  return repos.data.filter(repo => !repo.fork);
}

export async function getOrgRepos() {

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const repos = await octokit.rest.repos.listForOrg({
    org: "GitMetricsLab",
    per_page: 100,
    type: "public",
    sort: "pushed",
    direction: "desc",
  });

  return repos.data.filter(repo => !repo.fork);
}
