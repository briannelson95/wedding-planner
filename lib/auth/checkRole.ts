import { Role } from '@prisma/client'

export function canUploadOrViewFiles(role: Role | undefined | null): boolean {
    return role === 'COUPLE' || role === 'PLANNER'
}