```markdown
# school-management Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill covers the development patterns and conventions used in the `school-management` repository, a TypeScript-based Next.js application. It documents file naming, import/export styles, commit message patterns, and testing conventions to help maintain consistency and productivity in the codebase.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `studentProfile.ts`, `courseList.tsx`

### Import Style
- Use **relative imports** for referencing modules within the project.
  - Example:
    ```typescript
    import { getStudent } from '../utils/studentUtils';
    ```

### Export Style
- Both **named** and **default exports** are used.
  - Named export example:
    ```typescript
    export function calculateGrade(score: number): string { ... }
    ```
  - Default export example:
    ```typescript
    export default StudentProfile;
    ```

### Commit Message Patterns
- Freeform commit messages, sometimes with prefixes.
- Average commit message length: 76 characters.
  - Example:
    ```
    Add attendance tracking to student dashboard
    ```

## Workflows

### Adding a New Feature
**Trigger:** When implementing a new feature or module  
**Command:** `/add-feature`

1. Create a new file using camelCase naming.
2. Use relative imports to include dependencies.
3. Export your component or function (named or default as appropriate).
4. Write or update corresponding test files (`*.test.*`).
5. Commit changes with a descriptive message.

### Fixing a Bug
**Trigger:** When resolving a bug or issue  
**Command:** `/fix-bug`

1. Locate the relevant file(s) using camelCase convention.
2. Apply the fix, maintaining code style.
3. Update or add tests to cover the fix.
4. Commit with a clear, descriptive message.

### Refactoring Code
**Trigger:** When improving code structure or readability  
**Command:** `/refactor`

1. Identify code to refactor.
2. Rename files/functions using camelCase if needed.
3. Update all relative imports accordingly.
4. Ensure exports remain consistent (named/default).
5. Run tests to verify no regressions.
6. Commit with a message describing the refactor.

## Testing Patterns

- Test files follow the `*.test.*` pattern (e.g., `studentUtils.test.ts`).
- Testing framework is not specified; check project dependencies for details.
- Place tests alongside the modules or in a dedicated test directory.
- Example test file:
  ```typescript
  // studentUtils.test.ts
  import { calculateGrade } from './studentUtils';

  test('calculates grade correctly', () => {
    expect(calculateGrade(95)).toBe('A');
  });
  ```

## Commands
| Command      | Purpose                                  |
|--------------|------------------------------------------|
| /add-feature | Start workflow for adding a new feature  |
| /fix-bug     | Start workflow for fixing a bug          |
| /refactor    | Start workflow for refactoring code      |
```
