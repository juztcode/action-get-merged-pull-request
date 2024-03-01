import * as github from '@actions/github';
import * as core from '@actions/core';

interface PullRequest {
  title: string;
  body: string;
  number: number;
  labels: string[] | null;
  assignees: string[] | null;
  base_branch: string;
  head_branch: string;
}

async function run(): Promise<void> {
  try {
    const commitSha = core.getInput('commit_sha') || github.context.sha;

    const pull = await getMergedPullRequest(
      core.getInput('github_token'),
      github.context.repo.owner,
      github.context.repo.repo,
      commitSha
    );

    if (!pull) {
      core.debug('pull request not found');
      return;
    }

    core.setOutput('title', pull.title);
    core.setOutput('body', pull.body);
    core.setOutput('number', pull.number);
    core.setOutput('labels', pull.labels?.join('\n'));
    core.setOutput('assignees', pull.assignees?.join('\n'));
    core.setOutput('base_branch', pull.base_branch);
    core.setOutput('head_branch', pull.head_branch);
  } catch (e) {
    core.error(e);
    core.setFailed(e.message);
  }
}

async function getMergedPullRequest(
  githubToken: string,
  owner: string,
  repo: string,
  sha: string
): Promise<PullRequest | null> {
  const client = new github.GitHub(githubToken);

  const resp = await client.pulls.list({
    owner,
    repo,
    sort: 'updated',
    direction: 'desc',
    state: 'closed',
    per_page: 100
  });

  const pull = resp.data.find(p => p.merge_commit_sha === sha);
  if (!pull) {
    return null;
  }

  return {
    title: pull.title,
    body: pull.body,
    number: pull.number,
    labels: pull.labels.map(l => l.name),
    assignees: pull.assignees.map(a => a.login),
    base_branch: pull.base.ref,
    head_branch: pull.head.ref
  };
}

run();
