export function getEnvVariable(key: string): string {
	return import.meta.env[key as keyof ImportMetaEnv];
}
