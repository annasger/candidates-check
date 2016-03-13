package ru.cbr.candidatesCheck.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.cbr.candidatesCheck.domen.Candidate;
import ru.cbr.candidatesCheck.service.CandidateService;

import java.util.List;

@RestController
//@RequestMapping(value = "/candidate")
public class CandidateController {
    @Autowired
    private CandidateService candidateService;

    public CandidateController() {

    }

    @RequestMapping(value = "/candidate", method = RequestMethod.GET)
    List<Candidate> candidate(){
        return candidateService.getAll();
    }

    @RequestMapping(value = "/candidate", method = RequestMethod.POST)
    Candidate add(@RequestBody Candidate candidate){
        return candidateService.add(candidate);

    }

    @RequestMapping(value = "/candidate/{id}", method = RequestMethod.POST)
    String del(@PathVariable(value = "id") String id_del){
        try {
            Long id = Long.parseLong(id_del);
            candidateService.del(id);
        } catch (NumberFormatException e) {
            System.err.println(id_del + e.getMessage());
        }

        return id_del;
    }


 /*   @RequestMapping(value = "/candidate/del/{id}", method = RequestMethod.POST)
    String  del_old (@PathVariable(value = "id") String id_del){
        try {
            Long id = Long.parseLong(id_del);
            candidateService.del(id);
        } catch (NumberFormatException e) {
            System.err.println(id_del + e.getMessage());
        }

        return id_del;
    }
*/

}
