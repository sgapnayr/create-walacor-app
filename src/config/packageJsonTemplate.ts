interface Scripts {
  [key: string]: string;
}

export const basePackageJson = {
  name: "walacor",
  version: "0.1.0",
  private: true,
  scripts: <Scripts>{
    dev: "next dev",
    build: "next build",
    start: "next start",
  },
  dependencies: {
    next: "^14.2.5",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
  },
  devDependencies: {
    "@types/node": "^20.4.2",
    "@types/react": "^18.2.13",
    "@types/react-dom": "^18.2.7",
    typescript: "^5.1.6",
  },
  resolutions: {
    rimraf: "^4.0.0",
    glob: "^9.0.0",
  },
};
