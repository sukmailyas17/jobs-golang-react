import { FilterProps } from "@/types";

export async function fetchData(filters:FilterProps) {
    const{manufacturer,model}=filters
    const response=await fetch(`http://localhost:1234/job?type=${manufacturer}&level=${model}`,{
        next:{revalidate:10}
       });
    const result=await response.json();
    return result
}