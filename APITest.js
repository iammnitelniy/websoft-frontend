function count_users (id_sub) {

    return XQuery('for $c in collaborators where contains($c/fullname, "' + fullname_sub + '") return $c');
    
    
    }
    
