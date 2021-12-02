import { Specification } from "../model/Specification"
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "./ISpecificationRepository"

class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[]

  constructor() {
    this.specifications = []
  }
  findByName(name: string): Specification {
    const specification = this.specifications.find((spec) => spec.name === name)

    return specification
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification()
    Object.assign(specification, {
      name,
      description,
    })

    this.specifications.push(specification)
  }
}

export { SpecificationsRepository }
