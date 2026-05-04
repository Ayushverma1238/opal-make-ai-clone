import { VariableName, VariableType } from "@prisma/client";

export const buildOrgVariables = (orgId: string, orgName: string, teamId: string, teamName: string) => [
    {
        orgId,
        name: "data left",
        dataType: "number",
        value: String(536870912),
        type: VariableType.SYSTEM,
        variableName: VariableName.ORGANIZATION
    },
    {
        orgId,
        name: "organization id",
        dataType: "string",
        value: orgId,
        type: VariableType.SYSTEM,
        variableName: VariableName.ORGANIZATION
    },
    {
        orgId,
        name: "organization name",
        dataType: "text",
        value: orgName,
        type: VariableType.SYSTEM,
        variableName: VariableName.ORGANIZATION
    },
    {
        orgId,
        name: "operations left",
        dataType: "number",
        value: String(1000),
        type: VariableType.SYSTEM,
        variableName: VariableName.ORGANIZATION
    },
    {
        orgId,
        name: "zone domain",
        dataType: "text",
        value: "eu1.make.com",
        type: VariableType.SYSTEM,
        variableName: VariableName.ORGANIZATION
    },
    {
        orgId,
        name: "Team id",
        dataType: "string",
        value: teamId,
        type: VariableType.SYSTEM,
        variableName: VariableName.TEAM
    },
    {
        orgId,
        name: "Team name",
        dataType: "text",
        value: teamName,
        type: VariableType.SYSTEM,
        variableName: VariableName.TEAM
    },
];