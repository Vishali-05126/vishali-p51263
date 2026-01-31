"use server";

import { z } from "zod";
import { assessInjuryRisk, InjuryRiskAssessmentInput } from "@/ai/flows/injury-risk-assessment";
import { analyzeTechnique, AnalyzeTechniqueInput } from "@/ai/flows/technique-feedback-from-video-analysis";
import { personalizedExerciseRecommendations, PersonalizedExerciseRecommendationsInput } from "@/ai/flows/personalized-exercise-recommendations";
import { assessMentalReadiness, MentalReadinessInput } from "@/ai/flows/mental-readiness-assessment";


export async function getInjuryRisk(input: InjuryRiskAssessmentInput) {
    const result = await assessInjuryRisk(input);
    return result;
}

export async function getTechniqueFeedback(input: AnalyzeTechniqueInput) {
    const result = await analyzeTechnique(input);
    return result;
}

export async function getExercisePlan(input: PersonalizedExerciseRecommendationsInput) {
    const result = await personalizedExerciseRecommendations(input);
    return result;
}

export async function getMentalReadiness(input: MentalReadinessInput) {
    const result = await assessMentalReadiness(input);
    return result;
}
