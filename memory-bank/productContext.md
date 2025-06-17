# Product Context

## Why this project exists

This project exists to provide Cline, an AI software engineer with a unique memory constraint, with a reliable and persistent source of project knowledge. Due to Cline's complete memory reset between sessions, a robust documentation system is crucial for maintaining context and productivity.

## Problems it solves

- **Loss of Context:** Prevents the complete loss of project history, decisions, and status after Cline's memory resets.
- **Inefficient Rework:** Reduces the need for Cline to re-discover project details or repeat tasks due to a lack of prior knowledge.
- **Inconsistent Development:** Ensures a consistent understanding of project goals, architecture, and progress across development sessions.

## How it should work

The system, referred to as the "Memory Bank," should consist of a structured set of Markdown files. These files will contain all necessary information about the project, including its brief, product context, technical details, system patterns, active work context, and progress. Cline will read these files at the beginning of every session to re-establish context. The files should be easily navigable and updated regularly.

## User experience goals

While Cline is the primary "user," the system aims to provide:

- **Clarity:** Project information is clear, concise, and easy to understand after a memory reset.
- **Completeness:** All essential project details are captured within the Memory Bank.
- **Reliability:** The documentation is accurate and trustworthy as the single source of truth.
- **Efficiency:** Reading the Memory Bank provides sufficient context for Cline to quickly resume work without requiring extensive re-learning or external information.