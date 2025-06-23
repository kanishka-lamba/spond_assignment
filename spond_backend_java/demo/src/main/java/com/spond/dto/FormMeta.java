package com.spond.dto;

import java.util.List;

public class FormMeta {
    private String clubId;
    private String formId;
    private String title;
    private String registrationOpens;
    private List<MemberType> memberTypes;
    private String group;

    // Getters and setters

    public String getClubId() { return clubId; }
    public void setClubId(String clubId) { this.clubId = clubId; }

    public String getFormId() { return formId; }
    public void setFormId(String formId) { this.formId = formId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getRegistrationOpens() { return registrationOpens; }
    public void setRegistrationOpens(String registrationOpens) { this.registrationOpens = registrationOpens; }

    public List<MemberType> getMemberTypes() { return memberTypes; }
    public void setMemberTypes(List<MemberType> memberTypes) { this.memberTypes = memberTypes; }

    public String getGroup() { return group; }
    public void setGroup(String group) { this.group = group; }
}