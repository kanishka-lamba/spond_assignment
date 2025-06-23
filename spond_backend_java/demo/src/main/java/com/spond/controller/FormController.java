package com.spond.controller;

import com.spond.dto.FormMeta;
import com.spond.dto.MemberType;
import com.spond.dto.SubmissionRequest;
import com.spond.model.Submission;
import com.spond.repository.SubmissionRepository;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class FormController {

    @Autowired
    private SubmissionRepository submissionRepository;

    @GetMapping("/form")
    public List<FormMeta> getForm() {
        FormMeta form1 = new FormMeta();
        form1.setClubId("britsport");
        form1.setFormId("B171388180BC457D9887AD92B6CCFC86");
        form1.setTitle("Coding camp summer 2025");
        form1.setRegistrationOpens("2024-12-16T00:00:00Z");
        form1.setMemberTypes(Arrays.asList(
                new MemberType("8FE4113D4E4020E0DCF887803A886981", "Active Member"),
                new MemberType("4237C55C5CC3B4B082CBF2540612778E", "Social Member")
        ));
        form1.setGroup("Group A");

        FormMeta form2 = new FormMeta();
        form2.setClubId("testport");
        form2.setFormId("B171388180BC457D9887AD92B6CCFC87");
        form2.setTitle("Tennis camp summer 2025");
        form2.setRegistrationOpens("2025-12-16T00:00:00Z");
        form2.setMemberTypes(Arrays.asList(
                new MemberType("8FE4113D4E4020E0DCF887803A886981", "Active Member"),
                new MemberType("4237C55C5CC3B4B082CBF2540612778E", "Social Member")
        ));
        form2.setGroup("Group B");

        return Arrays.asList(form1, form2);
    }

    @PostMapping("/form/submit")
    public ResponseEntity<Map<String, Object>> submitForm(@RequestBody SubmissionRequest req) {
        System.out.println("Received: " + req.birth_date + " | " + req.member_type_id);
        Submission submission = new Submission();
        submission.setName(req.name);
        submission.setEmail(req.email);
        submission.setPhone(req.phone);
        submission.setBirthDate(req.birth_date);
        submission.setMemberTypeId(req.member_type_id);
        submission.setGroupName(req.group);

        submissionRepository.save(submission);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Submission successful");
        response.put("data", req);
        
        return ResponseEntity.ok(response);
    }

}
