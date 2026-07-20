package com.cognizant.springlearn.service;

import com.cognizant.springlearn.Country;
import org.springframework.stereotype.Service;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {

    public Country getCountry(String code) {
        try (ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("country.xml")) {
            Object bean = context.getBean("countries");
            List<?> rawList = (bean instanceof List) ? (List<?>) bean : List.of();

            Optional<Country> country = rawList.stream()
                .filter(obj -> obj instanceof Country)
                .map(obj -> (Country) obj)
                .filter(c -> c.getCode() != null && c.getCode().equalsIgnoreCase(code))
                .findFirst();

            return country.orElse(null);
        }
    }
}
