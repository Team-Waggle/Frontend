import axiosInstance from './axiosInstance';
import {
    USER_POST,
    PROJECTS_APPLICATION_URL,
    PROJECTS_MEMBER_URL,
} from '../constants/endpoint';
import type { ProjectPayload } from '../types/api/response/payload/project';

/**
 * 
 * 비고
 * 
 * 내 작성글의 api가 USER_PROJECT에서 USER_POST로 변경됨에 따라, 기존 projectRoster의 기능을 그대로 복사해 postRoster로 파일 생성
 * projectRoster가 더 이상 필요 없어짐이 완벽히 확인되면 projectRoster 파일은 삭제할 예정입니다.
 * 
 */

type ApiEnvelope<T> = {
    code: number;
    message: string;
    payload: T;
    timestamp: string;
    success: boolean;
};

export async function getUserPosts(): Promise<ProjectPayload[]> {
    const { data } =
        await axiosInstance.get<ApiEnvelope<ProjectPayload | ProjectPayload[]>>(
            USER_POST,
        );
    const p = data?.payload as any;
    return Array.isArray(p) ? p : [p];
}

export async function getPostApplicantsCount(
    projectId: number,
): Promise<number> {
    const url = PROJECTS_APPLICATION_URL(projectId);
    const { data } = await axiosInstance.get<ApiEnvelope<any>>(url);

    const payload = data?.payload;
    if (Array.isArray(payload)) return payload.length;
    if (payload && typeof payload === 'object') {
        if (typeof payload.total === 'number') return payload.total;
        if (typeof payload.total_count === 'number') return payload.total_count;
        if (typeof payload.count === 'number') return payload.count;
    }
    return 0;
}

export async function getPostMembersCount(
    projectId: number,
): Promise<number> {
    const url = PROJECTS_MEMBER_URL(projectId);
    const { data } = await axiosInstance.get<ApiEnvelope<any>>(url);

    const payload = data?.payload;
    if (Array.isArray(payload)) return payload.length;
    if (payload && typeof payload === 'object') {
        if (typeof payload.total === 'number') return payload.total;
        if (typeof payload.total_count === 'number') return payload.total_count;
        if (typeof payload.count === 'number') return payload.count;
    }
    return 0;
}
