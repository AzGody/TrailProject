<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CourseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['course:read']],
    denormalizationContext: ['groups' => ['course:write']],
)]
#[ORM\Entity(repositoryClass: CourseRepository::class)]
class Course
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['course:read', 'course:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\NotBlank]
    #[Assert\Type('string')]
    private ?string $nom = null;
    
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\NotBlank]
    private ?\DateTimeInterface $date = null;
    
    #[ORM\Column]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\NotBlank]
    #[Assert\Valid]
    private array $localisation = [];

    #[ORM\Column]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\NotBlank]
    #[Assert\Type('int')]
    private ?int $distance = null;
    
    #[ORM\Column(nullable: true)]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\Type('int')]
    private ?int $denivelePositif = null;
    
    #[ORM\Column(nullable: true)]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\Type('int')]
    private ?int $deniveleNegatif = null;

    #[ORM\ManyToOne(inversedBy: 'course')]
    #[Groups(['course:read', 'course:write'])]
    #[Assert\Valid]
    private ?Evenement $evenement = null;
    
    #[ORM\ManyToMany(targetEntity: Utilisateur::class, mappedBy: 'course')]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\NotBlank]
    #[Assert\Valid]
    private Collection $utilisateurs;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\Type('string')]
    #[Assert\Length(max: 2000)]
    private ?string $description = null;

    public function __construct()
    {
        $this->utilisateurs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getLocalisation(): array
    {
        return $this->localisation;
    }

    public function setLocalisation(array $localisation): self
    {
        $this->localisation = $localisation;

        return $this;
    }

    public function getDistance(): ?int
    {
        return $this->distance;
    }

    public function setDistance(int $distance): self
    {
        $this->distance = $distance;

        return $this;
    }

    public function getDenivelePositif(): ?int
    {
        return $this->denivelePositif;
    }

    public function setDenivelePositif(?int $denivelePositif): self
    {
        $this->denivelePositif = $denivelePositif;

        return $this;
    }

    public function getDeniveleNegatif(): ?int
    {
        return $this->deniveleNegatif;
    }

    public function setDeniveleNegatif(?int $deniveleNegatif): self
    {
        $this->deniveleNegatif = $deniveleNegatif;

        return $this;
    }

    public function getEvenement(): ?Evenement
    {
        return $this->evenement;
    }

    public function setEvenement(?Evenement $evenement): self
    {
        $this->evenement = $evenement;

        return $this;
    }

    /**
     * @return Collection<int, Utilisateur>
     */
    public function getUtilisateurs(): Collection
    {
        return $this->utilisateurs;
    }

    public function addUtilisateur(Utilisateur $utilisateur): self
    {
        if (!$this->utilisateurs->contains($utilisateur)) {
            $this->utilisateurs->add($utilisateur);
            $utilisateur->addCourse($this);
        }

        return $this;
    }

    public function removeUtilisateur(Utilisateur $utilisateur): self
    {
        if ($this->utilisateurs->removeElement($utilisateur)) {
            $utilisateur->removeCourse($this);
        }

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }
}
